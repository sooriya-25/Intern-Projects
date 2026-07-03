import { Card, Input, Select, Row, Col } from "antd";

import Button from "@mui/material/Button";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

const { Search } = Input;

const departments = ["All", "CSE", "IT", "ECE", "EEE", "Mechanical"];

function SearchFilter({
  searchText,
  setSearchText,
  department,
  setDepartment,
  handleSort,
  sortAscending,
}) {
  return (
    <Card
      style={{
        marginBottom: 25,
        borderRadius: 12,
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        {/* Search */}

        <Col xs={24} md={8}>
          <Search
            placeholder="🔍 Search Student"
            allowClear
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>

        {/* Department */}

        <Col xs={24} md={8}>
          <Select
            size="large"
            style={{ width: "100%" }}
            value={department}
            onChange={setDepartment}
            options={departments.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </Col>

        {/* Sort */}

        <Col xs={24} md={8}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            size="large"
            onClick={handleSort}
            sx={{
              height: 40,
              textTransform: "none",
              fontSize: 16,
              borderRadius: 2,
            }}
          >
            {sortAscending ? "Sort A → Z" : "Sort Z → A"}
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default SearchFilter;
