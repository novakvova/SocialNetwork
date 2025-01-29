import { useParams } from 'react-router-dom';
import { useGetGroupMembersQuery, useGetGroupQuery, useJoinGroupMutation, useLeaveGroupMutation } from '../../services/apiGroup';
import { Spin, Alert, Button, notification } from 'antd';
import ChatBox from '../Chat/ChatBox';
import { RootState } from "../../redux/store";
import { useSelector } from 'react-redux';

const GroupDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const groupId = Number(id);
  const userId = useSelector((state: RootState) => state.account.account?.id);
  const { data: group, error: groupError, isLoading: groupLoading} = useGetGroupQuery(groupId);
  const { data: groupMembers, error: membersError, isLoading: membersLoading, refetch: refetchMembers} = useGetGroupMembersQuery(groupId);
  const [joinGroup] = useJoinGroupMutation();
  const [leaveGroup] = useLeaveGroupMutation();

  // Перевірка, чи є користувач учасником групи
  const isMember = groupMembers?.members?.some(member => member.id === Number(userId));

  if (groupLoading || membersLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const handleAction = async (groupId: number, action: "join" | "leave") => {
    try {
      if (action === "join") {
        await joinGroup(groupId).unwrap();
        notification.success({ message: "Ви приєдналися до групи" });
      } else {
        await leaveGroup(groupId).unwrap();
        notification.success({ message: "Ви покинули групу" });
      }
      refetchMembers();
    } catch {
      notification.error({ message: "Помилка приєднання/виходу" });
    }
  };

  if (groupError || membersError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message="Помилка завантаження" description="Щось пішло не так, спробуйте ще раз." type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/3 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Деталі групи</h1>
        <p><strong>Назва групи:</strong> {group?.name}</p>
        <p><strong>Опис групи:</strong> {group?.description}</p>

        {/* Кнопка "Покинути" - показується, якщо користувач є учасником */}
        <Button
            type="primary"
            danger
            onClick={() => handleAction(groupId, "leave")}
            disabled={!isMember}
            style={{ display: isMember ? "block" : "none" }}
        >
            Покинути
        </Button>

        {/* Кнопка "Приєднатися" - показується, якщо користувач не є учасником */}
        <Button
            type="primary"
            onClick={() => handleAction(groupId, "join")}
            disabled={isMember}
            style={{ display: !isMember ? "block" : "none" }}
        >
            Приєднатися
        </Button>

        <h2 className="text-xl font-bold mt-6 mb-4">Учасники групи:</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Ім'я</th>
                <th scope="col" className="px-6 py-3">Роль</th>
              </tr>
            </thead>
            <tbody>
              {groupMembers?.members?.length ? (
                groupMembers.members.map((member) => (
                  <tr key={member.id} className="bg-white border-b">
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

      <div className="md:w-2/3 p-6 bg-white overflow-y-auto">
        <h2 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my-6">
          Чат групи
        </h2>
        <div className="bg-gray-50 border rounded-lg p-4 h-full">
          <ChatBox group={groupId} />
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsPage;
