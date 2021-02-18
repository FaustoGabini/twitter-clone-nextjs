import Head from "next/head"; /* Utilidad para cambiar todo lo de adentro del head */
import AppLayout from "../components/AppLayout";
import { colors } from "../styles/theme";
import Button from "../components/Button";
import GitHub from "../components/Icon/GitHub";
export default function Home() {
  return (
    <>
      <Head>
        <title>devter 🐤</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/devter-logo.png" alt="Logo" />
          <h1>Devter</h1>
          <h2>
            Talk about development <br />
            with developers
          </h2>
          <div>
            <Button>
              <GitHub fill="#fff" width={24} height={24} />
              Login with GitHub
            </Button>
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        img {
          width: 120px;
        }

        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }

        div {
          margin-top: 16px;
        }
      `}</style>
    </>
  );
}
