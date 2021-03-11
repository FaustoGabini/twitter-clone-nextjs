import Avatar from "../Avatar";
import useTimeAgo from "../../hooks/useTimeAgo";
export default function Devit({
  avatar,
  userName,
  content,
  id,
  img,
  createdAt,
}) {
  const timeago = useTimeAgo(createdAt);

  return (
    <>
      <article>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <date>{timeago}</date>
          </header>

          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>

      <style jsx>
        {`
          article {
            border-bottom: 1.5px solid #eee;
            display: flex;
            padding: 10px 15px;
          }

          div {
            padding-right: 10px;
          }

          img {
            border-radius: 10px;
            width: 100%;
            margin-top: 10px;
            height: auto;
          }

          p {
            line-height: 1.3125;
            margin: 0;
          }

          date {
            color: #555;
            font-size: 14px;
          }
        `}
      </style>
    </>
  );
}
