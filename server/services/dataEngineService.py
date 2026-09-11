import sys
import json
import os
import pandas as pd
import numpy as np

def load_dataset(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    if ext in ['.xlsx', '.xls']:
        df = pd.read_excel(file_path)
    else:
        # Default to CSV
        try:
            df = pd.read_csv(file_path, encoding='utf-8')
        except UnicodeDecodeError:
            df = pd.read_csv(file_path, encoding='latin1')
    return df

def inspect_dataset(file_path):
    df = load_dataset(file_path)
    row_count = len(df)
    columns = list(df.columns)
    
    col_info = {}
    measures = []
    dimensions = []
    date_cols = []

    for col in columns:
        dtype = str(df[col].dtype)
        is_numeric = np.issubdtype(df[col].dtype, np.number)
        is_date = 'date' in col.lower() or 'time' in col.lower() or 'year' in col.lower() or 'month' in col.lower()

        if is_numeric:
            measures.append(col)
            col_info[col] = {
                'type': 'numeric',
                'min': float(df[col].min()) if not df[col].empty and pd.notnull(df[col].min()) else 0,
                'max': float(df[col].max()) if not df[col].empty and pd.notnull(df[col].max()) else 0,
                'sum': float(df[col].sum()) if not df[col].empty and pd.notnull(df[col].sum()) else 0
            }
        elif is_date:
            date_cols.append(col)
            col_info[col] = {'type': 'temporal', 'uniqueCount': int(df[col].nunique())}
        else:
            dimensions.append(col)
            top_vals = [str(x) for x in df[col].dropna().unique()[:5]]
            col_info[col] = {
                'type': 'categorical',
                'uniqueCount': int(df[col].nunique()),
                'sampleValues': top_vals
            }

    return {
        'rowCount': row_count,
        'columns': columns,
        'measures': measures,
        'dimensions': dimensions,
        'dateColumns': date_cols,
        'columnDetails': col_info
    }

def aggregate_dataset(file_path, dimension, measure, secondary_measure=None, agg='SUM', limit=15):
    df = load_dataset(file_path)
    
    # Verify column existence case-insensitively
    col_map = {c.lower(): c for c in df.columns}
    
    dim_actual = col_map.get(dimension.lower(), dimension) if dimension else None
    meas_actual = col_map.get(measure.lower(), measure) if measure else None
    sec_meas_actual = col_map.get(secondary_measure.lower(), secondary_measure) if secondary_measure else None

    if not meas_actual or meas_actual not in df.columns:
        # Fallback to first numeric column
        numeric_cols = [c for c in df.columns if np.issubdtype(df[c].dtype, np.number)]
        meas_actual = numeric_cols[0] if numeric_cols else df.columns[0]

    # Convert measure to numeric float explicitly
    df[meas_actual] = pd.to_numeric(df[meas_actual], errors='coerce').fillna(0.0).astype(float)
    if sec_meas_actual and sec_meas_actual in df.columns:
        df[sec_meas_actual] = pd.to_numeric(df[sec_meas_actual], errors='coerce').fillna(0.0).astype(float)

    # Aggregation function mapping
    agg_func = 'sum'
    if agg.upper() in ['AVG', 'MEAN']:
        agg_func = 'mean'
    elif agg.upper() == 'COUNT':
        agg_func = 'count'
    elif agg.upper() == 'MAX':
        agg_func = 'max'
    elif agg.upper() == 'MIN':
        agg_func = 'min'

    def to_flt(val):
        try:
            return round(float(val), 2)
        except Exception:
            return 0.0

    if dim_actual and dim_actual in df.columns:
        # Group by dimension
        df[dim_actual] = df[dim_actual].astype(str).fillna('Unknown')
        
        agg_dict = {meas_actual: agg_func}
        if sec_meas_actual and sec_meas_actual in df.columns:
            agg_dict[sec_meas_actual] = agg_func

        grouped = df.groupby(dim_actual, as_index=False).agg(agg_dict)
        
        # Sort descending by primary measure
        grouped = grouped.sort_values(by=meas_actual, ascending=False)
        
        # Limit records for clean visualization
        if limit and len(grouped) > limit:
            top_slice = grouped.head(limit)
            other_meas = float(grouped.iloc[limit:][meas_actual].sum())
            
            # If there are many more categories, group into "Others"
            if len(grouped) > limit + 1 and not ('date' in dim_actual.lower() or 'year' in dim_actual.lower()):
                other_row = {dim_actual: 'Others', meas_actual: other_meas}
                if sec_meas_actual and sec_meas_actual in df.columns:
                    other_row[sec_meas_actual] = float(grouped.iloc[limit:][sec_meas_actual].sum())
                grouped = pd.concat([top_slice, pd.DataFrame([other_row])], ignore_index=True)
            else:
                grouped = top_slice

        results = []
        for _, row in grouped.iterrows():
            item = {
                'label': str(row[dim_actual]),
                'value': to_flt(row[meas_actual])
            }
            if sec_meas_actual and sec_meas_actual in df.columns:
                item['secondaryValue'] = to_flt(row[sec_meas_actual])
            results.append(item)

        total_value = to_flt(df[meas_actual].sum())
        return {
            'dimension': dim_actual,
            'measure': meas_actual,
            'secondaryMeasure': sec_meas_actual,
            'aggregation': agg.upper(),
            'total': total_value,
            'chartData': results
        }
    else:
        # Scalar KPI
        val = to_flt(df[meas_actual].agg(agg_func))
        return {
            'dimension': '',
            'measure': meas_actual,
            'aggregation': agg.upper(),
            'total': val,
            'chartData': [{'label': meas_actual, 'value': val}]
        }

if __name__ == '__main__':
    try:
        raw_input = sys.stdin.read()
        payload = json.loads(raw_input)
        action = payload.get('action')
        file_path = payload.get('filePath')

        if not os.path.exists(file_path):
            print(json.dumps({'error': f'File not found: {file_path}'}))
            sys.exit(1)

        if action == 'inspect':
            info = inspect_dataset(file_path)
            print(json.dumps(info))
        elif action == 'aggregate':
            dim = payload.get('dimension', '')
            meas = payload.get('measure', '')
            sec_meas = payload.get('secondaryMeasure', None)
            agg = payload.get('aggregation', 'SUM')
            limit = payload.get('limit', 15)
            result = aggregate_dataset(file_path, dim, meas, sec_meas, agg, limit)
            print(json.dumps(result))
        else:
            print(json.dumps({'error': f'Unknown action: {action}'}))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)
