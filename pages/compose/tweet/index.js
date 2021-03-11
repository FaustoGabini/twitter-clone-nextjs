import { useEffect, useState } from "react";
import AppLayout from "../../../components/AppLayout";
import Button from "../../../components/Button";
import useUser from "../../../hooks/useUser";
import {
  addDevit,
  upLoadImage,
} from "../../../firebase/client";
import { useRouter } from "next/router";
import Head from "next/head";
import Avatar from "../../../components/Avatar";
const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(
    COMPOSE_STATES.USER_NOT_KNOWN
  );
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (task) {
      let onProgress = () => {};
      let onError = () => {};
      let onComplete = () => {
        console.log("onComplete");
        task.snapshot.ref
          .getDownloadURL()
          .then((imgUrl) => {
            setImgURL(imgUrl);
          });
      };
      task.on(
        "state_changed",
        onProgress,
        onError,
        onComplete
      );
    }
  }, [task]);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  /* Arrastramos y salimos */
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];

    const task = upLoadImage(file);
    setTask(task);
  };

  const isButtonDisabled =
    message.length === 0 ||
    status === COMPOSE_STATES.LOADING;

  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un Devit / Devter</title>
        </Head>
        <section className="form-container">
          {user && (
            <section className="avatar-container">
              <Avatar src={user.avatar} />
            </section>
          )}

          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              placeholder="¿Qué está pasando?"
              value={message}
            ></textarea>
            <section className="remove-img">
              {imgURL && (
                <button onClick={() => setImgURL(null)}>
                  x
                </button>
              )}

              {imgURL && <img src={imgURL} />}
            </section>

            <div>
              <Button disabled={isButtonDisabled}>
                Devitear
              </Button>
            </div>
          </form>
        </section>
      </AppLayout>

      <style jsx>{`
        div {
          padding: 15px;
        }

        form {
          padding: 10px;
          width: 100%;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          border: none;
          border-radius: 999px;
          color: #fff;
          font-size: 24px;
          width: 32px;
          height: 32px;
          position: absolute;
          right: 15px;
          top: 15px;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        .form-container {
          display: flex;
          align-items: flex-start;
        }

        .remove-img {
          position: relative;
        }

        img {
          height: auto;
          width: 100%;
          border-radius: 10px;
        }

        textarea {
          font-size: 21px;
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 10px;
          padding: 15px;
          min-height: 200px;

          outline: 0;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  );
}
