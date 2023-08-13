import type {InferGetStaticPropsType, GetStaticProps} from 'next'
import axios from "axios";

type Repo = {
  name: string
  stargazers_count: number
}

export const getStaticProps: GetStaticProps<{
  repo: any
}> = async () => {
  const res = await axios('http://localhost:3001/dashboard/recruiter/manage_jobs')
  const repo = await res.data;
  return {props: {repo}}
}

export default function Page({
                               repo,
                             }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(repo)
  return <div>
    Hello
  </div>
}