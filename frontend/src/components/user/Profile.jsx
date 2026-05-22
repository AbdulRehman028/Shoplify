import React from "react";
import UserLayout from "../layout/UserLayout";
import { useSelector } from "react-redux";
import CustomImage from "../common/CustomImage";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <UserLayout>
      <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-3">
          <figure className="avatar avatar-profile">
            <CustomImage
              src={user?.avatar?.url}
              alt={user?.name}
              className="rounded-circle img-fluid"
              customDefault="/images/default_avatar.jpg"
            />
          </figure>
        </div>

        <div className="col-12 col-md-5">
          <h4>Full Name</h4>
          <p>{user?.name}</p>

          <h4>Email Address</h4>
          <p>{user?.email}</p>

          <h4>Joined On</h4>
          <p>{user?.createdAt?.substring(0, 10)}</p>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
