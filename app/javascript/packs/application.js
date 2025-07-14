/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// Uncomment to copy all static images under ./images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('./images', true)
// const imagePath = (name) => images(name, true)
import ReactOnRails from 'react-on-rails';
import { start } from '@hotwired/turbo';

import { PostsIndex } from '../components/posts/posts-index';
import { PostShow } from '../components/posts/post-show';
import { PostForm } from '../components/posts/post-form';
import { AboutPage } from '../components/about/about-page';
import { ContactPage } from '../components/contact/contact-page';
import { SignupPage } from '../components/users/signup';
import { LoginPage } from '../components/users/login';
import { EditUserPage } from '../components/users/edit-user';
import { HomePost } from '../components/posts/home-posts';

// Inicializar Turbo
start();

// Configurar React on Rails con Turbo
ReactOnRails.setOptions({ 
  turbo: true,
  traceTurbolinks: process.env.TRACE_TURBOLINKS
});

// Registrar componentes
ReactOnRails.register({
  PostsIndex,
  PostShow,
  PostForm,
  AboutPage,
  ContactPage,
  SignupPage,
  LoginPage,
  EditUserPage,
  HomePost,
});
