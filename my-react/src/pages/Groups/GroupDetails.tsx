import { useNavigate, useParams } from 'react-router-dom';
import { useGetGroupMembersQuery, useGetGroupQuery, useJoinGroupMutation, useLeaveGroupMutation } from '../../services/apiGroup';
import { Spin, Alert, Button, notification, Card, Dropdown, Menu } from 'antd';
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import ChatBox from '../Chat/ChatBox';
import { RootState } from "../../redux/store";
import { useSelector } from 'react-redux';
import defaultProfile from "../../assets/images/ItGram.webp";

const GroupDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const groupId = Number(id);
  const userId = useSelector((state: RootState) => state.account.account?.id);
  const { data: group, error: groupError, isLoading: groupLoading } = useGetGroupQuery(groupId);
  const { data: groupMembers, error: membersError, isLoading: membersLoading, refetch: refetchMembers } = useGetGroupMembersQuery(groupId);
  const [joinGroup] = useJoinGroupMutation();
  const [leaveGroup] = useLeaveGroupMutation();
  const isMember = groupMembers?.members?.some(member => member.id === Number(userId));
  const navigation = useNavigate();

  if (groupLoading || membersLoading) {
    return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
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
    return <div className="flex justify-center items-center h-screen"><Alert message="Помилка завантаження" description="Щось пішло не так, спробуйте ще раз." type="error" showIcon /></div>;
  }

  const membersMenu = (
    <Menu>
      {groupMembers?.members?.length ? (
        groupMembers.members.map((member) => (
          <Menu.Item key={member.id}>{member.username}</Menu.Item>
        ))
      ) : (
        <Menu.Item disabled>У групі ще немає учасників.</Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="max-w-4xl mx-auto py-2">
      <Card className="shadow-lg rounded-lg border p-4 mb-6">
        <div className="flex items-center space-x-3">
          <img src={group?.image || defaultProfile} alt="Фото групи" className="w-16 h-16 object-cover rounded-xl " />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{group?.name}</h2>
            <p className="text-gray-600 mb-4">{group?.description}</p>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-2 mt-4">
              {isMember ? (
                <Button type="primary" danger onClick={() => handleAction(groupId, "leave")}>Покинути</Button>
              ) : (
                <Button type="primary" onClick={() => handleAction(groupId, "join")}>Приєднатися</Button>
              )}
              <Dropdown overlay={membersMenu} trigger={['click']}>
                <Button className="mt-2">Учасники <DownOutlined /></Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </Card>
      <Card className="shadow-lg rounded-lg border p-6">
        <h2 className="text-center text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my2">Чат групи</h2>
        <div>
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            className="mb-4 mt-0 text-blue-500"
            onClick={() => navigation("..")}
          >
            Назад до груп
          </Button>
        </div>
        <div className="h-96 overflow-auto flex flex-col-reverse">
          <ChatBox group={groupId} />
        </div>
      </Card>
    </div>
  );
};

export default GroupDetailsPage;
