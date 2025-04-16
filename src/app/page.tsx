import { files as filesSchema, folders as foldersSchema} from "~/server/db/schema";
import DriveContents from "./drive-contents";
import { db } from "~/server/db";



export default  function HomePage() {
 

 return  <div
 style={{
   position: "fixed",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   backgroundColor: "rgba(0, 128, 0, 0.9)",
   color: "white",
   padding: "1rem 2rem",
   borderRadius: "8px",
   fontWeight: "bold",
   textAlign: "center",
   zIndex: 1000,
 }}
>
Thank You For Your Visit
</div>
}
