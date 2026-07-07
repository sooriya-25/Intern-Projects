import { useEffect, useState } from "react";
import {
  Modal,
  Row,
  Col,
  Typography,
  Tag,
  Spin,
  Divider,
} from "antd";
import { getMovieDetails } from "../services/omdb";

const { Title, Paragraph, Text } = Typography;

function MovieDetailsModal({ open, onClose, movieId }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      setLoading(true);

      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={850}
      centered
    >
      {loading ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Spin size="large" />
        </div>
      ) : (
        movie && (
          <Row gutter={30}>
            <Col span={9}>
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{
                  width: "100%",
                  borderRadius: 12,
                }}
              />
            </Col>

            <Col span={15}>
              <Title level={2}>{movie.Title}</Title>

              <Tag color="blue">{movie.Year}</Tag>
              <Tag color="green">{movie.Runtime}</Tag>
              <Tag color="purple">{movie.Rated}</Tag>

              <Divider />

              <Paragraph>{movie.Plot}</Paragraph>

              <Text strong>Genre : </Text>
              <Text>{movie.Genre}</Text>

              <br />

              <Text strong>Director : </Text>
              <Text>{movie.Director}</Text>

              <br />

              <Text strong>Actors : </Text>
              <Text>{movie.Actors}</Text>

              <br />

              <Text strong>Language : </Text>
              <Text>{movie.Language}</Text>

              <br />

              <Text strong>Country : </Text>
              <Text>{movie.Country}</Text>

              <br />

              <Text strong>IMDb : </Text>
              <Tag color="gold">{movie.imdbRating}</Tag>
            </Col>
          </Row>
        )
      )}
    </Modal>
  );
}

export default MovieDetailsModal;