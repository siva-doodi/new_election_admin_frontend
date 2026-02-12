export const API_ROUTES = {
  elections: {
    list: '/elections/',
    detail: id => `/meta/assemblies`,
    create: '/elections/',
    update: id => `/elections/${id}`,
    delete: id => `/elections/${id}`,
  },
  members:{
    list:'/members/'
  },
  candidates:{
    list:'/nominations/',
    APPROVE_CANDIDATE:(id) => `/nominations/${id}/approve`,
    reject_candidate:(id)=>`/nominations/${id}/reject`
  },
  notifications:{
    list:'/notifications/',
    create: '/notifications/create'
  },
  results: {
    list: (type = 'all') => `/results/admin/${type}`,
    approve:(id)=>`/results/admin/publish/${id}`,
  },
  nominations:{
    list:'/nominations/',
    reject: (id) => `/nominations/${id}/reject`,
  },
  meta:{
    events:'meta/elections/events'
  }
}
