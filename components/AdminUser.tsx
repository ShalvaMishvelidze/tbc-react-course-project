"use client";
import { deleteUser, editUser } from "@/utils/actions/admin_actions";
import { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const AdminUser = ({ text, user: u, setDel }: any) => {
  const [user, setUser] = useState(u);
  const [edit, setEdit] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const cancelHandler = () => {
    setUser(u);
    setEdit(false);
  };

  const deleteHandler = (id: number) => {
    deleteUser(id);
    setDel(true);
  };

  const editHandler = async (user: any) => {
    toast.info("editing user");
    if (
      imageRef.current &&
      imageRef.current.files &&
      imageRef.current.files[0]
    ) {
      const image = imageRef.current.files[0];
      const response = await fetch(
        `/api/avatar/upload?filename=${image.name}`,
        {
          method: "POST",
          headers: { id: user.id },
          body: image,
        }
      );
      const newBlob = (await response.json()) as PutBlobResult;
      editUser({ ...user, image: newBlob.url }).then((res) => {
        setUser(res);
        setEdit(false);
        toast.success("user edited");
      });
    } else {
      editUser(user).then((res) => {
        setUser(res);
        setEdit(false);
        toast.success("user edited");
      });
    }
  };

  return (
    <div className="admin-user" key={user.id}>
      {edit ? (
        <>
          <div className="admin-user-left edit">
            <Image src={user.image} alt="user image" width={100} height={100} />
            <label htmlFor="file-input">{text.changeImage}</label>
            <input
              id="file-input"
              name="file-input"
              type="file"
              className="file-input"
              onChange={(e) => {
                const file = e.target.files![0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setUser({ ...user, image: reader.result });
                };
                reader.readAsDataURL(file);
              }}
              ref={imageRef}
            />
          </div>
          <div className="admin-user-right edit">
            <input
              type="text"
              value={user.name}
              placeholder="name"
              required
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="lastname"
              value={user.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            />
            <input
              type="text"
              placeholder="email"
              value={user.email}
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <select
              required
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
        </>
      ) : (
        <>
          <div className="admin-user-left">
            <Image src={user.image} alt="user image" width={100} height={100} />
          </div>
          <div className="admin-user-right">
            <h4>{user.name}</h4>
            <h4>{user.lastname}</h4>
            <p>{user.email}</p>
            <h5>{user.role}</h5>
          </div>
        </>
      )}
      {edit ? (
        <div className="admin-user-bottom">
          <button onClick={() => editHandler(user)}>{text.save}</button>
          <button onClick={() => cancelHandler()}>{text.cancel}</button>
        </div>
      ) : (
        <div className="admin-user-bottom">
          <button onClick={() => setEdit(true)}>{text.edit}</button>
          <button onClick={() => deleteHandler(user.id)}>{text.delete}</button>
        </div>
      )}
    </div>
  );
};
export default AdminUser;
