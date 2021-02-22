import { useEffect, useState } from "react";
import Head from "next/head"; /* Utilidad para cambiar todo lo de adentro del head */
import AppLayout from "../components/AppLayout";
import { colors } from "../styles/theme";
import Button from "../components/Button";
import GitHub from "../components/Icon/GitHub";
import Logo from "../components/Icon/Logo";
import { loginWithGithub } from "../firebase/client";
import { useRouter } from "next/router";
import useUser, { USER_STATES } from "../hooks/useUser";

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    /* Si tenemos un user que lo redirija a /home */
    /* El Router en Next ya viene incorporado */
    user && router.replace("/home");
  }, [user]);
  const handleClick = () => {
    loginWithGithub()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>devter 🐤</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <Logo width="100" />
          <h1>Devter</h1>
          <h2>
            Talk about development <br />
            with developers
          </h2>
          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub
                  fill="#fff"
                  width={24}
                  height={24}
                />
                Iniciar Sesion
              </Button>
            )}
            {user === USER_STATES.NOT_KNOWN && (
              <img src="/spinner.gif" />
            )}
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
          color: ${colors.primary};
          font-weight: 800;
          font-size: 32px;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
          text-align: center;
        }

        div {
          margin-top: 16px;
        }
      `}</style>
    </>
  );
}
