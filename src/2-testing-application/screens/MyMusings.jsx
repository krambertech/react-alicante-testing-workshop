import { useEffect, useState } from "react";
import api from "../api";

import Musing from "../components/Musing";
import NewMusing from "../components/NewMusing";
import Modal from "../components/Modal";

import useModal from "../hooks/useModal";
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
  const [search, setSearch] = useState("");

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

  const displayedMusings = search
    ? data?.filter((musing) =>
        musing.text.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <div className="MyMusings">
      <div className="MyMusings-toolbar">
        <button onClick={newMusingModal.open}>📝 New musing</button>
        <input
          role="searchbox"
          type="search"
          placeholder="🔍 Search musings"
          onChange={(e) => setSearch(e.target.value)}
        />
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
      ) : displayedMusings?.length ? (
        <>
          <p role="status">
            {search
              ? `Found ${pluralize(displayedMusings?.length || 0, "musing")}`
              : `You have ${pluralize(
                  displayedMusings?.length || 0,
                  "musing"
                )}`}
          </p>

          <div className="MyMusings-list">
            {displayedMusings?.map((item) => (
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
