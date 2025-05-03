import { FaCircleUser } from "react-icons/fa6";

const UserIcon = ({
  dropdown,
  setDropdown,
}: {
  dropdown: boolean;
  setDropdown: any;
}) => {
  return (
    <button className="user-icon" onClick={() => setDropdown(!dropdown)}>
      <FaCircleUser />
    </button>
  );
};
export default UserIcon;
