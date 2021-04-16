export default function Login() {
  return (
    <div className="row">
      <form className="col-12 col-md-8 offset-md-2">
        <h3 className="text-center fw-bold py-4">Log into your account</h3>
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Error
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
          ></button>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="name@example.com"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <button className="btn btn-success float-end">Log in</button>
      </form>
    </div>
  );
}
