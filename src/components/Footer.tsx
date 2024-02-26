import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className=" flex border-t bg-gray-100 p-4 font-medium">
      <div className="flex">
        <Link href="/">
          <div>Music-PT</div>
        </Link>
        <div>좋아하는 음악을 번역하고, 새로운 언어를 공부해요!</div>
      </div>
      <Link href="https://github.com/saemii-24/Music-PT" target="_blank">
        <FaGithub />
      </Link>
    </footer>
  );
}
