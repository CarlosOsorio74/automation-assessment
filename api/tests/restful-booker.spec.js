const apiClient = require('../utils/api-client');
const payloads = require('../data/booking-payloads.json');

describe('Pruebas E2E de API - Restful Booker', () => {
  let token;
  let bookingId;

  test('1. Debería generar un token de autenticación (POST /auth)', async () => {
    const response = await apiClient.post('/auth', {
      username: "admin",
      password: "password123"
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
    token = response.data.token;
  });

  test('2. Debería obtener la lista de reservas (GET /booking)', async () => {
    const response = await apiClient.get('/booking');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('3. Debería crear una nueva reserva (POST /booking)', async () => {
    const response = await apiClient.post('/booking', payloads.newBooking);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('bookingid');
    expect(response.data.booking.firstname).toBe(payloads.newBooking.firstname);
    bookingId = response.data.bookingid;
  });

  test('4. Debería consultar la reserva creada (GET /booking/:id)', async () => {
    const response = await apiClient.get(`/booking/${bookingId}`);
    expect(response.status).toBe(200);
    expect(response.data.firstname).toBe(payloads.newBooking.firstname);
  });

  test('5. Debería eliminar la reserva (DELETE /booking/:id)', async () => {
    const response = await apiClient.delete(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` }
    });
    expect(response.status).toBe(201);
  });
});