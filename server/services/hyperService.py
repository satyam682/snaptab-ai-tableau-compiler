import sys
import os
import csv
from tableauhyperapi import (
    HyperProcess, Telemetry, Connection, CreateMode,
    TableDefinition, SqlType, TableName, escape_string_literal
)

def create_hyper_extract(csv_path, hyper_path):
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"CSV not found: {csv_path}")

    os.makedirs(os.path.dirname(hyper_path), exist_ok=True)
    if os.path.exists(hyper_path):
        os.remove(hyper_path)

    # Read CSV header and sample rows to infer column types
    with open(csv_path, mode='r', encoding='utf-8-sig', errors='replace') as f:
        reader = csv.reader(f)
        headers = next(reader, [])
        sample_row = next(reader, [])

    if not headers:
        raise ValueError("CSV header is empty")

    with HyperProcess(telemetry=Telemetry.DO_NOT_SEND_USAGE_DATA_TO_TABLEAU) as hyper:
        with Connection(endpoint=hyper.endpoint, database=hyper_path, create_mode=CreateMode.CREATE_AND_REPLACE) as connection:
            connection.catalog.create_schema('Extract')
            table_name = TableName('Extract', 'Extract')
            table_def = TableDefinition(table_name=table_name)

            for i, h in enumerate(headers):
                val = sample_row[i] if i < len(sample_row) else ""
                val_clean = val.strip().replace(",", "").replace("$", "").replace("%", "")
                
                # Check if measure
                is_num = False
                try:
                    float(val_clean)
                    is_num = True
                except ValueError:
                    is_num = False

                if is_num and any(m in h.lower() for m in ['sales', 'profit', 'quantity', 'price', 'revenue', 'amount', 'cost', 'discount', 'margin', 'id']):
                    table_def.add_column(h, SqlType.double())
                else:
                    table_def.add_column(h, SqlType.text())

            connection.catalog.create_table(table_def)

            abs_csv = os.path.abspath(csv_path)
            count = connection.execute_command(
                f"COPY {table_name} FROM {escape_string_literal(abs_csv)} WITH (FORMAT CSV, HEADER TRUE, DELIMITER ',')"
            )
            print(f"[SnapTab Hyper] Successfully extracted {count} rows into {hyper_path}")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python hyperService.py <input.csv> <output.hyper>")
        sys.exit(1)

    csv_in = sys.argv[1]
    hyper_out = sys.argv[2]
    create_hyper_extract(csv_in, hyper_out)
