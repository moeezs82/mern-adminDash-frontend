import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getProducts } from "actions/productAction";
import Header from "components/Layout/include/Header";
import Loader from "components/Layout/loader/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const { loading, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const ProductCard = ({ productStat }) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color={theme.palette.secondary[700]}
            gutterBottom
          >
            {productStat.product.category}
          </Typography>
          <Typography variant="h5" component="div">
            {productStat.product.name}
          </Typography>
          <Typography
            sx={{ mb: "1.5rem" }}
            color={theme.palette.secondary[400]}
          >
            ${Number(productStat.product.price).toFixed(2)}
          </Typography>
          <Rating value={productStat.product.rating} readOnly />

          <Typography variant="body2">
            {productStat.product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Hide" : "See More"}
          </Button>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{
            color: theme.palette.neutral[300],
          }}
        >
          <CardContent>
            <Typography>id: {productStat._id}</Typography>
            <Typography>Supply Left: {productStat.product.supply}</Typography>
            <Typography>
              Yearly Sales This Year: {productStat.yearlySalesTotal}
            </Typography>
            <Typography>
              Yearly Units Sold This Year:{" "}
              {productStat.yearlyTotalSoldUnits}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box m="1.5rem 2.5rem">
          <Header title="PRODUCTS" subTitle="See your list of products." />
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              "&>div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {products && products.map((product, key) => (
              <ProductCard productStat={product} key={key} />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Products;
