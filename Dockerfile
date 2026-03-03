# ---------- Build Stage ----------
FROM node:20 AS build
 
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
 
# ---------- Production Stage ----------
FROM node:20-alpine
 
WORKDIR /app
COPY --from=build /app ./
 
ENV NODE_ENV=production
 
EXPOSE 3000
 
CMD ["npm", "start"]
