import React from 'react';

const getStatusStyle = (status: string) => {
  return status.toLowerCase() === 'opened' ? 'bg-yellow-500 text-white' : 'bg-green-600 text-white';
};

const getPriorityStyle = (priority: string) => {
  return priority.toLowerCase() === 'urgent' ? 'bg-red-600 text-white' : 'bg-gray-400 text-white';
};

const ViewTicket = () => {
  const comments = [
    { id: 1, name: 'Zeinab 123Ahmad', text: 'This issue needs urgent attention!', avatar: 'https://xsgames.co/randomusers/assets/avatars/male/46.jpg' },
    { id: 2, name: 'Ali Khalifa', text: 'I will handle this tomorrow.', avatar: 'https://xsgames.co/randomusers/assets/avatars/male/46.jpg' },
    { id: 3, name: 'Ahmad G', text: 'Let me know if you need any updates.', avatar: 'https://xsgames.co/randomusers/assets/avatars/male/46.jpg' }
  ];

  return (
    <div className='bg-gray-300 w-fit p-6 pt-9 z-50 rounded-md shadow-lg mb-2'>
      <div className='w-[600px] bg-white p-4 flex flex-col rounded-lg gap-4 shadow-md'>
        {/** Assigned By */}
        <TicketRow
          icon='pi-user-edit'
          label='Assigned By'
          avatarSrc='https://xsgames.co/randomusers/assets/avatars/male/46.jpg'
          name='Ali Khalifa'
        />
        {/** Assignee */}
        <TicketRow
          icon='pi-user-plus'
          label='Assignee'
          avatarSrc='https://xsgames.co/randomusers/assets/avatars/male/46.jpg'
          name='Ahmad G'
        />
        {/** Priority */}
        <TicketRow icon='pi-file-check' label='Priority'>
          <span className={`p-1 rounded-md text-sm ${getPriorityStyle('Urgent')}`}>Urgent</span>
        </TicketRow>
        {/** Status */}
        <TicketRow icon='pi-file' label='Status'>
          <span className={`p-1 rounded-md text-sm ${getStatusStyle('Opened')}`}>Opened</span>
        </TicketRow>
        {/** Created Date */}
        <TicketRow icon='pi-calendar-clock' label='Created Date'>
          <span className='p-1 rounded-md text-sm text-gray-800'>Dec-17-2024</span>
        </TicketRow>
      </div>

      {/** Comment Section */}
      <div className='bg-white mt-6 rounded-lg py-4 shadow-md'>
        <div className='h-full flex justify-between items-center px-4'>
          <div className='flex items-center gap-2'>
            <img
              className='h-8 w-8 rounded-full'
              src='https://xsgames.co/randomusers/assets/avatars/male/46.jpg'
              alt='User Avatar'
            />
            <p className='font-semibold text-gray-800'>Zeinab 123Ahmad</p>
          </div>
          <button className='bg-[#FBC80E] py-1 px-4 rounded-md font-semibold text-black shadow-md'>
            Post
          </button>
        </div>
        <div className='mt-3 px-4'>
          <input
            className='h-12 w-full rounded-md pl-3 border border-gray-400 focus:outline-none'
            placeholder='Post a comment...'
          />
        </div>
      </div>

      {/** Comments List */}
      <div className='bg-white mt-4 rounded-lg py-4 shadow-md px-4'>
        <h3 className='text-gray-700 font-semibold mb-3'>Comments</h3>
        {comments.map((comment) => (
          <Comment key={comment.id} name={comment.name} text={comment.text} avatarSrc={comment.avatar} />
        ))}
      </div>
    </div>
  );
};

const TicketRow = ({ icon, label, avatarSrc, name, children }: any) => (
  <div className='flex justify-between items-center text-gray-800 text-sm'>
    <div className='flex items-center gap-2'>
      <i className={`pi ${icon} text-gray-600`} />
      <p className='font-semibold'>{label}</p>
    </div>
    <div className='flex items-center gap-2'>
      {avatarSrc && <img className='h-6 w-6 rounded-full' src={avatarSrc} alt='User Avatar' />}
      {name && <p className='font-medium'>{name}</p>}
      {children}
    </div>
  </div>
);

const Comment = ({ name, text, avatarSrc }: any) => (
  <div className='flex gap-3 items-start border-b pb-2 mb-2'>
    <img className='h-8 w-8 rounded-full' src={avatarSrc} alt='User Avatar' />
    <div>
      <p className='font-semibold text-gray-800'>{name}</p>
      <p className='text-gray-700 text-sm'>{text}</p>
    </div>
  </div>
);

export default ViewTicket;
