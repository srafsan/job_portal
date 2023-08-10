import React from "react";
import { useRouter } from "next/router";

const Review = () => {
  const router = useRouter();
  const { productId, reviewId } = router.query;

  return (
    <div>
      Review {reviewId} for product {productId}
    </div>
  );
};

export default Review;
