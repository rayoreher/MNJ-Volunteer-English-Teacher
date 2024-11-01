import { Volunteer, VolunteerStatus } from "@/types/Volunteer"


export default function VolunteerDetails(volunteer: Volunteer) {
  const totalDays = Math.round((new Date(volunteer.end_date).getTime() - new Date(volunteer.start_date).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow">
      <div className="col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-500">Email:</div>
          <div className="text-gray-900">{volunteer.email}</div>
          <div className="text-gray-500">Age:</div>
          <div className="text-gray-900">{volunteer.age}</div>
          <div className="text-gray-500">Nationality:</div>
          <div className="text-gray-900">{volunteer.nationality}</div>
        </div>
      </div>

      <div className="col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical Information</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-500">Medical Problems:</div>
          <div className="text-gray-900">{volunteer.medical_problems || 'None'}</div>
          <div className="text-gray-500">Allergies:</div>
          <div className="text-gray-900">{volunteer.allergies || 'None'}</div>
        </div>
      </div>

      <div className="col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Information</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-500">Start Date:</div>
          <div className="text-gray-900">{new Date(volunteer.start_date).toLocaleDateString()}</div>
          <div className="text-gray-500">End Date:</div>
          <div className="text-gray-900">{new Date(volunteer.end_date).toLocaleDateString()}</div>
          <div className="text-gray-500">Total Days:</div>
          <div className="text-gray-900">{totalDays}</div>
          {/* <div className="text-gray-500">Status:</div> */}
          {/* <div className="text-gray-900">
              {volunteer.status}
          </div> */}
        </div>
      </div>
    </div>
  )
}