import AppLayout from "../../components/AppLayout";
import { useState, useEffect } from "react";
import Devit from "../../components/Devit";
import Create from "../../components/Icon/Create";
import Home from "../../components/Icon/Home";
import Search from "../../components/Icon/Search";

import useUser from "../../hooks/useUser";
import { fetchLatestDevits } from "../../firebase/client";
import Link from "next/link";
import Head from "next/head";
export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser(); /* Revisa si el usuario esta identificado y si no lo esta te redirije a / */
  useEffect(() => {
    user &&
      fetchLatestDevits().then((timeline) => {
        setTimeline(timeline);
      });
  }, [user]);

  return (
    <>
      <AppLayout>
        <Head>
          <title>Inicio / Devter</title>
        </Head>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((devit) => {
            return (
              <Devit
                key={devit.id}
                createdAt={devit.createdAt}
                userName={devit.userName}
                content={devit.content}
                id={devit.id}
                avatar={devit.avatar}
                userId={devit.userId}
              />
            );
          })}
        </section>
        <nav>
          <Link href="/">
            <a>
              <Home
                width={32}
                height={32}
                stroke="
              #09f"
              />
            </a>
          </Link>
          <Link href="/search">
            <a>
              <Search
                width={32}
                height={32}
                stroke="
              #09f"
              />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Create
                width={32}
                height={32}
                stroke="
              #09f"
              />
            </a>
          </Link>
        </nav>
      </AppLayout>
      <style jsx>{`
        header {
          border-bottom: 1px solid #eee;
          position: sticky;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          height: 49px;
          top: 0;
          width: 100%;
          display: flex;
          align-items: center;
        }
        section {
          flex: 1;
        }

        h2 {
          font-size: 21px;
          font-wight: 800;
          padding-left: 15px;
        }

        nav {
          bottom: 0px;
          background: #fff;
          border-top: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          width: 100%;
        }

        nav a {
          height: 100%;
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          justify-content: center;
        }

        nav a:hover {
          background: radial-gradient(
            #0099ff22 15%,
            transparent 16%
          );
          background-size: 180px 180px;
          background-position: center;
        }
      `}</style>
    </>
  );
}
