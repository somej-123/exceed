import React from 'react';
import { Table } from 'react-bootstrap';

interface CommonTableProps {
  columns: { key: string; label: string; className?: string }[];
  data: any[];
  loading?: boolean;
  emptyMessage?: string;
  renderRow: (row: any) => React.ReactNode;
  className?: string;
  theadClassName?: string;
  tbodyClassName?: string;
}

const CommonTable: React.FC<CommonTableProps> = ({
  columns,
  data,
  loading = false,
  emptyMessage = '데이터가 없습니다.',
  renderRow,
  className = '',
  theadClassName = '',
  tbodyClassName = '',
}) => {
  return (
    <Table hover responsive className={className}>
      <thead className={theadClassName}>
        <tr>
          {columns.map(col => (
            <th key={col.key} className={col.className}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody className={tbodyClassName}>
        {loading ? (
          <tr>
            <td colSpan={columns.length} className="text-muted py-5 text-center">로딩 중...</td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-muted py-5 fs-5 text-center">{emptyMessage}</td>
          </tr>
        ) : (
          data.map(renderRow)
        )}
      </tbody>
    </Table>
  );
};

export default CommonTable;
