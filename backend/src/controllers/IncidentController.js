const connection = require('../database/connection');

async function index(request, response) {
  const { page = 1, size = 5 } = request.query;

  const [count] = await connection('incidents').count();

  const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(size)
    .offset((page - 1) * size)
    .select([
      'incidents.*',
      'ongs.name as ong_name',
      'ongs.email as ong_email',
      'ongs.whatsapp as ong_whatsapp',
      'ongs.city as ong_city',
      'ongs.uf as ong_uf'
    ]);

  response.header('X-Total-Count', count['count(*)']);

  return response.json(incidents);
}

async function create(request, response) {
  const { title, description, value } = request.body;
  const ong_id = request.headers.authorization;

  const [id] = await connection('incidents').insert({
    title,
    description,
    value,
    ong_id
  });

  return response.json({ id });
}

async function _delete(request, response) {
  const { id } = request.params;
  const ong_id = request.headers.authorization;
  const incident = await connection('incidents').where('id', id).select('ong_id').first();
  if (!incident) {
    return response.status(404).json({ error: 'Incident not found.' });
  }

  if (incident.ong_id !== ong_id) {
    return response.status(403).json({ error: 'Operation not permitted.' });
  }
  await connection('incidents').where('id', id).delete();
  return response.status(204).send();
}

module.exports = {
  create,
  index,
  delete: _delete
};
