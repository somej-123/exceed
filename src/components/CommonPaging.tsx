import React from 'react';
import { Button } from 'react-bootstrap';

interface CommonPagingProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  pageLinkClassName?: string;
}

const CommonPaging: React.FC<CommonPagingProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  pageLinkClassName = '',
}) => {
  if (totalPages <= 1) return null;
  return (
    <nav>
      <ul className={`pagination justify-content-center ${className}`} style={{ marginBottom: 0 }}>
        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`} style={{ margin: '0 4px' }}>
          <Button
            className={`page-link ${pageLinkClassName}`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            size="sm"
            variant="dark"
          >
            이전
          </Button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1} className={`page-item${currentPage === i + 1 ? ' active' : ''}`} style={{ margin: '0 4px' }}>
            <Button
              className={`page-link ${pageLinkClassName}${currentPage === i + 1 ? ' active' : ''}`}
              onClick={() => onPageChange(i + 1)}
              size="sm"
              variant={currentPage === i + 1 ? "primary" : "dark"}
              style={currentPage === i + 1 ? { background: 'linear-gradient(90deg,#4e54c8,#8f94fb)', color: '#fff', border: 'none' } : {}}
            >
              {i + 1}
            </Button>
          </li>
        ))}
        <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`} style={{ margin: '0 4px' }}>
          <Button
            className={`page-link ${pageLinkClassName}`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            size="sm"
            variant="dark"
          >
            다음
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default CommonPaging;
