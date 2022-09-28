import { useEffect } from "react";
import api from "../api";

import Musing from "../components/Musing";
import NewMusing from "../components/NewMusing";
import Modal, { useModal } from "../components/Modal";

import useAsync from "../hooks/useAsync";
import useHotKey from "../hooks/useHotKey";
import pluralize from "../helpers/pluralize";

import "./MyMusings.css";

function MyMusings() {
  const {
    run: fetchMusings,
    data,
    isPending,
    error,
    setData,
  } = useAsync(api.getMyMusings);
  const newMusingModal = useModal();

  useHotKey("n", newMusingModal.open);

  useEffect(() => {
    fetchMusings();
  }, [fetchMusings]);

  const handleMusingCreated = async (newMusing) => {
    newMusingModal.close();
    setData([newMusing, ...data]);
  };

  const handleDeleteMusing = async (id) => {
    const result = await api.deleteMusing(id);
    if (!result.error) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="MyMusings">
      <div className="MyMusings-toolbar">
        <button onClick={newMusingModal.open}>📝 New musing</button>
        <input role="searchbox" type="search" placeholder="🔍 Search musings" />
      </div>
      <Modal
        title="📝 New musing"
        open={newMusingModal.isOpen}
        onClose={newMusingModal.close}
      >
        <NewMusing onCreated={handleMusingCreated} />
      </Modal>

      {error ? <p role="alert">⛔️ {error.message}</p> : null}

      {isPending ? (
        <p role="status">🤖 Loading musings...</p>
      ) : data?.length ? (
        <>
          <p role="status">
            {`You have ${pluralize(data?.length || 0, "musing")}`}
          </p>

          <div className="MyMusings-list">
            {data?.map((item) => (
              <Musing
                key={item.id}
                id={item.id}
                text={item.text}
                createdAt={item.created_at}
                onDelete={handleDeleteMusing}
              />
            ))}
          </div>
        </>
      ) : (
        <p role="status">
          🤔 You do not have any musings yet... Go create some!
        </p>
      )}
    </div>
  );
}

export default MyMusings;
