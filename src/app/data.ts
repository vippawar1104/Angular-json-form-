export default {
  orders: [
    {
      customer: {
        id: 'CUST001',
        name: 'Acme Corporation',
        department: 'Research & Development',
        phone: '(555) 123-4567'
      },
      title: 'Experimental Jetpacks',
      ordered: true,
      processId: 1002003001,
      assignee: 'Amy Wong',
      status: 'ordered',
      startDate: '2022-05-01',
      endDate: '2022-06-15',
    },
    {
      customer: {
        id: 'CUST002',
        name: 'Globex Corporation',
        department: 'Cybernetics',
        phone: '+1-800-987-6543'
      },
      title: 'Self-learning AI Modules',
      ordered: false,
      processId: 1002003002,
      assignee: 'Hermes Conrad',
      status: 'pending',
      startDate: '2022-06-20',
      endDate: '2022-07-30',
    }
  ]
};
