import { test, expect } from "../../fixtures/hooks-fixture";
import apiPathData from "../../data/api-test-data/api-path-data.json";
import restfulApiData from "../../data/api-test-data/restful-booker-api-module-data.json";
import { SchemaValidator } from '../../utils/schemaValidator';
import bookingSchema from '../../schemas/GetBooking.schema.json';
import bookingIdsSchema from '../../schemas/GetBookingIds.schema.json';
import postBookingSchema from '../../schemas/PostBooking.schema.json';
import updateBookingSchema from '../../schemas/UpdateBooking.schema.json';
import partialUpdateBookingSchema from '../../schemas/PatchBooking.schema.json';

// test("API Testing @api", async({request})=>{
//     const bookingIDs = await request.get('booking');
//     console.log(await bookingIDs.json());
// })

// test("API test2", async({request})=>{
//     const bookingDetails = await request.get('booking/3');
//     console.log(await bookingDetails.json());
//     console.log(bookingDetails.status());
//     expect(bookingDetails.status()).toBe(200);
//     const body =await bookingDetails.json();
//     console.log('firstname : ' + body.firstname);
// })

const validator = new SchemaValidator();
let commonBookingId : number;
test(
  "id - a - [Restful-Booker > Booking] Verify that the user is able tofetch all the booking IDs using GET API and receive valid response.",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "Test Case Link",
      description: "This is a test case link",
    },
  },
  async ({ request }) => {
    const bookingIDsResp = await request.get(apiPathData.booking_path);
    const bookingIdsJsonResp = await bookingIDsResp.json();
    console.log(bookingIDsResp);
    expect(bookingIDsResp.status()).toBe(200);
    expect(bookingIDsResp.statusText()).toBe("OK");
    expect(bookingIDsResp.ok()).toBeTruthy();
    expect(bookingIDsResp).not.toBeNull();
    expect(bookingIDsResp.headers()["content-type"]).toBe(
      restfulApiData.content_type,
    );

    validator.validate(bookingIdsSchema, bookingIdsJsonResp);
  },
);

test(
  "id - b - [Restful-Booker > Booking] Verify that the user is able to fetch booking details for a booking id using GET API and receives  valid response.",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "Test Case Link",
      description: "This is a test case link",
    },
  },
  async ({ request }) => {
    const bookingResp = await request.get(
      `${apiPathData.booking_path}/${restfulApiData.booking_id}`,
    );
    const bookingJsonResp = await bookingResp.json();
    console.log(bookingResp);
    console.log("JSON RESPONSE for Booking response : ", bookingJsonResp);

    expect(bookingResp.status()).toBe(200);
    expect(bookingResp.statusText()).toBe("OK");
    expect(bookingResp).not.toBeNull();
    //expect(bookingJsonResp.firstname).toEqual(restfulApiData.firstname);
    validator.validate(bookingSchema, bookingJsonResp);

  },
);

test(
  "id - c - [Restful-Booker > Booking] Verify that the user is able to create new booking using POST API and receives  valid response.",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "Test Case Link",
      description: "This is a test case link",
    },
  },
  async ({ request }) => {
    const createBookingResp = await request.post(apiPathData.booking_path, {
      data: restfulApiData.create_booking,
    });

    const createBookingJsonResp = await createBookingResp.json();
    console.log('createBookingJsonResp :::: ',createBookingJsonResp);
    expect(createBookingResp.status()).toBe(200);
    commonBookingId = createBookingJsonResp.bookingid;
    console.log(commonBookingId);
    expect(createBookingJsonResp.booking).toMatchObject(
      restfulApiData.create_booking,
    );
    validator.validate(postBookingSchema, createBookingJsonResp);
  },
);

test(
  "id - d - [Restful-Booker > Booking] Verify that the user is able to update existing booking using UPDATE API and receives valid response.",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "Test Case Link",
      description: "This is a test case link",
    },
  },
  async ({ request, commonApiUtils }) => {
    const tokenValue = await commonApiUtils.createToken();
    const updateBookingResp = await request.put(
   //   `${apiPathData.booking_path}/${restfulApiData.booking_id2}`,
      
      `${apiPathData.booking_path}/${commonBookingId}`,
      {
        headers: {
          Cookie: `token=${tokenValue}`,
        },
        data: restfulApiData.update_booking,
      },
    );

    const updateBookingJsonResp = await updateBookingResp.json();
    console.log(updateBookingResp);
    console.log("actual PUT(UPDATE): ", updateBookingJsonResp);
    console.log("Expected PUT(UPDATE): ", restfulApiData.update_booking);

    expect(updateBookingResp.status()).toBe(200);
    expect(updateBookingJsonResp).toMatchObject(restfulApiData.update_booking);
    validator.validate(updateBookingSchema, updateBookingJsonResp);
    
  },
);

test(
  "id - e - [Restful-Booker > Booking] Verify that the user is able to partially update existing booking using PATCH API and receives valid response.",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "Test Case Link",
      description: "This is a test case link",
    },
  },
  async ({ request, commonApiUtils }) => {
    const apiToken = await commonApiUtils.createToken();
    const patialUpdateBookingResp = await request.patch(
      `${apiPathData.booking_path}/${commonBookingId}`,
      {
        headers: {
          Cookie: `token=${apiToken}`,
        },
        data: restfulApiData.update_partial_booking,
      },
    );

    const patialUpdateBookingJsonResp = await patialUpdateBookingResp.json();

    console.log("actual PATCH(partial UPDATE): ", patialUpdateBookingJsonResp);
    console.log("Expected PATCH(patial UPDATE): ", restfulApiData.update_partial_booking);
    expect(patialUpdateBookingResp.status()).toBe(200);
    expect(patialUpdateBookingJsonResp.firstname).toMatch(
      restfulApiData.update_partial_booking.firstname,
    );
    expect(patialUpdateBookingJsonResp.lastname).toMatch(
      restfulApiData.update_partial_booking.lastname,
    );
    validator.validate(partialUpdateBookingSchema, patialUpdateBookingJsonResp);

  },
);

test(
  "id - f - [Restful-Booker > Booking] Verify that the user is able to delete existing booking using DELETE API and receives valid response.",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "Test Case Link",
      description: "This is a test case link",
    },
  },
  async ({ request, commonApiUtils }) => {
    const apiToken = await commonApiUtils.createToken();
    const deleteBookingResp = await request.delete(
      //`${apiPathData.booking_path}/${restfulApiData.booking_id3}`,
      `${apiPathData.booking_path}/${commonBookingId}`,
      {
        headers: {
          Cookie: `token=${apiToken}`,
        },
      },
    );
    expect(deleteBookingResp.status()).toBe(201);
    expect(deleteBookingResp.statusText()).toBe("Created");

    const getBookingResp = await request.get(
      `${apiPathData.booking_path}/${commonBookingId}`,
    );
    expect(getBookingResp.status()).toBe(404);
    expect(getBookingResp.statusText()).toBe("Not Found");
  },
);
