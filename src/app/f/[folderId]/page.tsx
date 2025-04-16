import { files as filesSchema, folders as foldersSchema} from "~/server/db/schema";
import { db } from "~/server/db";
import DriveContents from "~/app/drive-contents";
import { eq } from "drizzle-orm";



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
    const files = await db.select().from(filesSchema)
    .where(eq(filesSchema.parent, parseFolderId));
    
    const folders = await db.select().from(foldersSchema)
    .where(eq(foldersSchema.parent, parseFolderId));


 return <DriveContents files={files} folders={folders} />;
}
