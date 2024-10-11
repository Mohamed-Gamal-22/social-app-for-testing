"use client";
import Post from "@/app/_components/Post/Post";
import Loading from "@/app/loading";
import { getPost } from "@/lib/postsslice";
import { store } from "@/lib/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";

export default function page(props: string) {
  const dispatch = useDispatch<typeof store.dispatch>();
  // console.log("props", props.params.id);
  let { singlePost } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.posts
  );

  useEffect(() => {
    dispatch(getPost(props.params.id));
  }, []);

  return singlePost ? (
    <Box sx={{ width: "50%", mx: "auto" }}>
      <Post postObject={singlePost} allComments={true}/>
    </Box>
  ) : (
    <Loading />
  );
}
