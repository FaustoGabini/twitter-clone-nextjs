import { colors } from "../../styles/theme";

export default function Button({ children, onClick }) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>
        {`
          button {
            align-items: center;
            background: ${colors.black};
            color: #fff;
            border: 0;
            cursor: pointer;
            border-radius: 9999px;
            font-size: 16px;
            display: flex;
            font-weight: 800;
            padding: 8px 24px;
            transition: opacity 0.3s ease;
          }

          button :global(svg) {
            margin-right: 8px;
          }

          button:hover {
            opacity: 0.7;
          }
        `}
      </style>
    </>
  );
}
