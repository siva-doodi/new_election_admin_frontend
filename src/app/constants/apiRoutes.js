export const API_ROUTES = {
  elections: {
    list: '/elections/filter',
    detail: id => `/meta/assemblies`,
    create: '/elections/by-scope',
    update: id => `/elections/${id}`,
    delete: id => `/elections/${id}`,
  },
  members: {
    list: '/members/'
  },
  candidates: {
    list: '/nominations/filter',
    APPROVE_CANDIDATE: (id) => `/nominations/${id}/approve`,
    reject_candidate: (id) => `/nominations/${id}/reject`
  },
  notifications: {
    list: '/notifications/',
    create: '/notifications/create'
  },
  results: {
    list: (type = 'all') => `/results/admin/${type}`,
    publish: (id) => `/results/admin/publish/${id}`,
  },
  nominations: {
    list: '/nominations/filter',
    reject: (id) => `/nominations/${id}/reject`,
  },
  meta: {
    events: 'meta/elections/events',
    mandelVillages: (id) =>
      `/meta/assembly/${id}/mandals-villages`,
    // apiRoutes.js
    wardsByLocation: (assemblyId, mandalId, villageId) =>
      `/meta/wards/by-location?assembly_id=${assemblyId}&mandal_id=${mandalId}&village_id=${villageId}`,

  }
}
