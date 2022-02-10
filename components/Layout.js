import Head from "next/head";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <link
          rel="icon"
          href="https://cdn.pixabay.com/photo/2019/11/27/14/06/pokemon-4657023_960_720.png"
        ></link>
      </Head>
      {props.children}
    </>
  );
}
