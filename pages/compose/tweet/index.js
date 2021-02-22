import AppLayout from "../../../components/AppLayout";
import Button from "../../../components/Button";
import useUser from "../../../hooks/useUser";
export default function ComposeTweet() {
  return (
    <>
      <AppLayout>
        <form>
          <textarea placeholder="¿Qué está pasando?"></textarea>
          <div>
            <Button>Devitear</Button>
          </div>
        </form>
      </AppLayout>

      <style jsx>{`
        div {
          padding: 15px;
        }

        textarea {
          font-size: 21px;
          border: 0;
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
