import AppLayout from "../../components/AppLayout";
import { useState, useEffect } from "react";
import Devit from "../../components/Devit";
import useUser from "../../hooks/useUser";
export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser(); /* Revisa si el usuario esta identificado y si no lo esta te redirije a / */
  useEffect(() => {
    user &&
      fetch(
        "http://localhost:3000/api/statuses/home_timeline"
      )
        .then((res) => res.json())
        .then(setTimeline);
  }, [user]);

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((devit) => {
            return (
              <Devit
                key={devit.key}
                username={devit.username}
                message={devit.message}
                id={devit.id}
                avatar={devit.avatar}
              />
            );
          })}
        </section>
        <nav></nav>
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

        h2 {
          font-size: 21px;
          font-wight: 800;
          padding-left: 15px;
        }

        nav {
          bottom: 0;
          background: #fff;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  );
}
