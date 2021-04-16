export default function Footer() {
  return (
    <div className="container w-50 mx-auto">
      <hr className="bg-secondary my-4" />
      <div className="d-flex">
        <p>&copy; 2021</p>
        <a
          className="ms-auto link-dark text-decoration-none"
          href="https://github.com.zaxoavoki/apollo-blog"
        >
          <i className="bi-github" /> GitHub
        </a>
      </div>
    </div>
  );
}
