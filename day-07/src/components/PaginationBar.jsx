import { Pagination } from "antd";

function PaginationBar({
  currentPage,
  totalResults,
  setPage,
}) {
  return (
    <Pagination
      current={currentPage}
      total={totalResults}
      pageSize={10}
      showSizeChanger={false}
      onChange={(page) => setPage(page)}
      style={{
        marginTop: 30,
        textAlign: "center",
      }}
    />
  );
}

export default PaginationBar;