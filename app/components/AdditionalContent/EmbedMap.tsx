import { EmbedMediaSchema } from "@/app/validation";
import classNames from "classnames";
import { useState } from "react";
import { RiEarthFill } from "react-icons/ri";
import HookForm from "../HookForm";
import ModalForm from "../ModalForm";
import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";
import DeleteButton from "../DeleteButton";

const EmbedMap = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [setEmbedMap, deleteEmbedMap, embedMap] = useUserAdditionalContent(
    (s) => [s.setEmbedMap, s.removeEmbedMap, s.embedMap]
  );
  return (
    <>
      <div
        className={classNames({
          "cursor-pointer group relative bg-sPrimary space-y-2 text-tSecondary flex flex-col items-center justify-center px-10 py-14 rounded-lg":
            true,
        })}
        onClick={() => setIsOpened(true)}
      >
        {embedMap && <DeleteButton handleOnClick={deleteEmbedMap} />}
        <div>
          <span className="text-3xl">
            <RiEarthFill />
          </span>
        </div>
        <p className="text-center">Location</p>
        {isOpened && (
          <ModalForm isOpen={isOpened} onClose={() => setIsOpened(false)}>
            <div className="flex items-center space-x-2">
              <div>
                <h3 className="font-bold text-[#111] text-lg">Location</h3>
                <h5 className="text-xs">Share your location here</h5>
              </div>
            </div>
            <HookForm
              closeModal={() => setIsOpened(false)}
              schema={EmbedMediaSchema}
              onSubmit={async (data) => {
                setEmbedMap(data.title, data.value);
                setIsOpened(false);
              }}
              labelMapping={["Title", "Paste Your Link"]}
            />
          </ModalForm>
        )}
      </div>
    </>
  );
};

export default EmbedMap;
