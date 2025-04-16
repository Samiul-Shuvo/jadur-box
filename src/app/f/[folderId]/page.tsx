import { files as filesSchema, folders as foldersSchema} from "~/server/db/schema";
import { db } from "~/server/db";
import DriveContents from "~/app/drive-contents";
import { eq } from "drizzle-orm";

async function getAllParents(folderId: number){
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null){
    const folder = await db
    .selectDistinct()
    .from(foldersSchema)
    .where(eq(foldersSchema.id, currentId));

    if(!folder[0]){
      //throw new Error("Parent folder not found");
      break;
    }

    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }
  return parents;
}


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


    const filesPromise =  db.select().from(filesSchema)
    .where(eq(filesSchema.parent, parseFolderId));

    const foldersPromise =  db.select().from(foldersSchema)
    .where(eq(foldersSchema.parent, parseFolderId));

    const parentsPromise = getAllParents(parseFolderId);

    const [folders,files,parents ] = await Promise.all([foldersPromise,filesPromise, parentsPromise]);


 return <DriveContents files={files} folders={folders } parents={parents} />;
}
