import React from 'react';
import { useParams } from 'react-router-dom'; // для отримання ID з URL
import { useGetGroupMembersQuery, useGetGroupQuery } from '../../services/apiGroup';
import { Spin, Alert } from 'antd';

const GroupDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Fetching group details
  const { data: group, error: groupError, isLoading: groupLoading } = useGetGroupQuery(Number(id));

  // Fetching group members
  const { data: groupMembers, error: membersError, isLoading: membersLoading } = useGetGroupMembersQuery(Number(id));

  // Loading state for both group and members
  if (groupLoading || membersLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Error handling for either group or members
  if (groupError || membersError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert
          message="Помилка завантаження"
          description="Щось пішло не так, спробуйте ще раз."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Ліва частина з учасниками */}
      <div className="md:w-1/3 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Деталі групи</h1>
        <p>
          <strong>Назва групи:</strong> {group?.name}
        </p>
        <p>
          <strong>Опис групи:</strong> {group?.description}
        </p>

        <h2 className="text-xl font-bold mt-6 mb-4">Учасники групи:</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Ім'я</th>
                <th scope="col" className="px-6 py-3">Роль</th>
              </tr>
            </thead>
            <tbody>
              {groupMembers?.members?.length ? (
                groupMembers.members.map((member) => (
                  <tr key={member.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">{member.username}</td>
                    <td className="px-6 py-4">{member.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center">
                    У групі ще немає учасників.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Права частина з чатом */}
      <div className="md:w-2/3 p-6 bg-white overflow-y-auto">
        <h2 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my-6">
          Чат групи
        </h2>
        <div className="bg-gray-50 border rounded-lg p-4 h-full">
          {/* Тут буде компонент чату */}
          <p>Чат наразі не реалізовано.</p>
        </div>
      </div>
    </div>
  );
};
export default GroupDetailsPage;