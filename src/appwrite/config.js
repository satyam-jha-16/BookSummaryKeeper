import { conf } from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        import.meta.env.VIRE_APPWRITE_DATABASE_ID,
        appwriteCollectionID,
        slug,
        {
          userId,
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite:: service -- create post error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        import.meta.env.VIRE_APPWRITE_DATABASE_ID,
        import.meta.env.VIRE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          featuredImage,
          status,
          content,
        }
      );
    } catch (error) {
      console.log("Appwrite:: service -- update post error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        import.meta.env.VIRE_APPWRITE_DATABASE_ID,
        import.meta.env.VIRE_APPWRITE_COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite:: service -- deletion post error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        import.meta.env.VIRE_APPWRITE_DATABASE_ID,
        import.meta.env.VIRE_APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("Appwrite:: service -- couldn't get post", error);
      return false;
    }
  }

  async getAllPost(query = [Query.equal("isBookCompleted", "yes")]) {
    try {
      return await this.databases.listDocuments(
        import.meta.env.VIRE_APPWRITE_DATABASE_ID,
        import.meta.env.VIRE_APPWRITE_COLLECTION_ID,
        query
      );
    } catch (error) {
      console.log("Appwrite:: service -- couldn't get posts", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        import.meta.env.VIRE_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite:: service -- upload file", error);
      return false;
    }
  }

  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketID, fileID);
      return true;
    } catch (error) {
      console.log("Appwrite:: service -- couldn't delete file", error);
      return false;
    }
  }

  async getFilePreview(fileID) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketID, fileID);
    } catch (error) {
      console.log("Appwrite:: service -- couldn't show preview", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
