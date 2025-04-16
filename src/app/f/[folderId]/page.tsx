import DriveContents from "~/app/drive-contents";
import { getAllParentsForFolder, getFiles, getFolders } from "~/server/db/queries";


export default async function GoogleDriveClone(props : {
    params:Promise<{folderId:string}>;
}) {
    const params = await props.params;

    const parseFolderId = parseInt(params.folderId);

    if (isNaN(parseFolderId)) {
        return (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "red",
              color: "white",
              padding: "1rem 2rem",
              borderRadius: "8px",
              fontWeight: "bold",
              textAlign: "center",
              zIndex: 1000,
            }}
          >
            Invalid folder ID
          </div>
        );
      }
    console.log(typeof parseFolderId);


    const [folders,files,parents ] = await Promise.all([
      getFolders(parseFolderId),
      getFiles(parseFolderId),
      getAllParentsForFolder(parseFolderId)
    
    ]);


 return <DriveContents files={files} folders={folders } parents={parents} />;
}
