package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db = initDb()

type Users struct {
	Id        int    `gorm:"AUTO_INCREMENT" form:"id", json:"id"`
	FirstName string `gorm:"not null" form:"first_name", json:"first_name"`
	LastName  string `gorm:"not null" form:"last_name", json:"last_name"`
}

func main() {
	route := gin.Default()
	route.Use(cors.Default())
	v1 := route.Group("api/v1")
	{
		v1.POST("/users", postUser)
		v1.GET("/users", getUsers)
		v1.GET("/users/:id", getUser)
		v1.PUT("/users/:id", updateUser)
		v1.DELETE("/users/:id", deleteUser)
	}

	route.Run(":8080")
}

func initDb() *gorm.DB {
	db, err := gorm.Open("postgres", "host=postgres user=postgres port=5432 dbname=gong_users sslmode=disable")
	db.LogMode(true)

	if err != nil {
		panic(err)
	}

	if !db.HasTable(&Users{}) {
		db.CreateTable(&Users{})
		db.Set("gorm:table_options", "ENGINE=InnoDB").CreateTable(&Users{})
	}

	return db
}

func postUser(ctx *gin.Context) {
	var user Users
	ctx.Bind(&user)

	if user.FirstName != "" && user.LastName != "" {
		db.Create(&user)
		ctx.JSON(201, gin.H{"success": user})
	} else {
		ctx.JSON(422, gin.H{"error": "Fields are empty"})
	}
}

func getUsers(ctx *gin.Context) {
	var users []Users
	db.Find(&users)

	ctx.JSON(200, users)
}

func getUser(ctx *gin.Context) {
	id := ctx.Params.ByName("id")

	var user Users

	db.First(&user, id)

	if user.Id != 0 {
		ctx.JSON(200, user)
	} else {
		ctx.JSON(404, gin.H{"error": "User not found"})
	}
}

func updateUser(ctx *gin.Context) {
	id := ctx.Params.ByName("id")

	var user Users

	db.First(&user, id)

	if user.FirstName != "" && user.LastName != "" {
		if user.Id != 0 {
			var newUser Users
			ctx.Bind(&newUser)

			result := Users{
				Id:        user.Id,
				FirstName: newUser.FirstName,
				LastName:  newUser.LastName,
			}

			db.Save(&result)

			ctx.JSON(200, gin.H{"success": result})
		} else {
			ctx.JSON(404, gin.H{"error": "User not found"})
		}
	} else {
		ctx.JSON(422, gin.H{"error": "Fields are empty"})
	}
}

func deleteUser(ctx *gin.Context) {
	id := ctx.Params.ByName("id")

	var user Users

	db.First(&user, id)

	if user.Id != 0 {
		db.Delete(&user)

		ctx.JSON(200, gin.H{"success": "User #" + id + " deleted"})
	} else {
		ctx.JSON(404, gin.H{"error": "UUser not found"})
	}
}
