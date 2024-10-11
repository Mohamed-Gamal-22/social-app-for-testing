"use client";
import Grid from "@mui/material/Grid";
import Post from "./_components/Post/Post";
import { getAllPosts } from "@/lib/postsslice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { store } from "./../lib/store";
import { PostType } from "@/app/_interfaces/home";
import Loading from "./loading";

export default function Home() {
  let dispatch = useDispatch<typeof store.dispatch>();
  let { allPosts } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.posts
  );

  console.log(allPosts)

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <>
      {allPosts?.length > 0 ? <Grid container spacing={3} sx={{ marginBlock: "30px" }}>
        <Grid item sm={3}></Grid>
        <Grid item sm={6} sx={{ paddingBlock: "10px" }}>
          {allPosts?.map((postObj: PostType) => (
            <Post key={postObj._id} postObject={postObj} />
          ))}
        </Grid>
        <Grid item sm={3}></Grid>
      </Grid> : <Loading />}
      
    </>
  );
}
