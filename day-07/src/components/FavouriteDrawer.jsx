import {
  Drawer,
  List,
  Avatar,
  Typography,
  Tag,
  Empty,
  Divider,
} from "antd";

const { Title, Text } = Typography;

function FavouriteDrawer({ open, onClose, favourites }) {
  return (
    <Drawer
      title={
        <Title level={4} style={{ margin: 0 }}>
          ❤️ Favourite Movies
        </Title>
      }
      open={open}
      onClose={onClose}
      width={380}
    >
      <Divider style={{ marginTop: 0 }} />

      {favourites.length === 0 ? (
        <Empty description="No Favourite Movies" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={favourites}
          renderItem={(movie) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    shape="square"
                    size={70}
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/70x100"
                    }
                  />
                }
                title={
                  <Text strong style={{ fontSize: 16 }}>
                    {movie.Title}
                  </Text>
                }
                description={
                  <>
                    <Tag color="blue">{movie.Year}</Tag>
                    <br />
                    <Text type="secondary">
                      IMDb ID : {movie.imdbID}
                    </Text>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
}

export default FavouriteDrawer;