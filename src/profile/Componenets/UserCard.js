import React from 'react';

const UserInfoCard = ({ user }) => {
  return (
    <div className="max-w-sm mx-auto mt-5 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-center mt-4 ">
        {/* <img
          className="w-24 h-24 rounded-full"
          src={user.avatarUrl}
          alt={user.name}
        /> */}
        {user.avatarUrl}
      </div>
      <div className="text-center px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="mt-2 text-gray-700">{user.bio}</p>
      </div>
    </div>
  );
};

export default UserInfoCard;
