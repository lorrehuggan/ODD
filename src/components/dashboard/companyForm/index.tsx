
const CompanyForm = () => {
  return (
    <div className="min-h-[calc(100vh-3rem)] flex flex-col justify-center items-center">
      <div>
        <form className="flex gap-2 items-center border-b border-white">
          <label htmlFor="companyName">Enter Company Name:</label>
          <input placeholder="Uber Eats" type="text" name="companyName" id="companyName" className="bg-transparent text-white p-2  focus:outline-none" />
          <button className="p-2 hover:text-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CompanyForm
