package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os/exec"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type RequestData struct {
	SelectedOptions []string `json:"selectedOptions"`
}

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Post("/video/process", func(c *fiber.Ctx) error {
		var data RequestData
		if err := c.BodyParser(&data); err != nil {
			return c.Status(400).SendString("Failed to parse request")
		}

		fmt.Println("Selected Options:", data.SelectedOptions)

		// 선택된 옵션을 문자열로 결합
		selectedOptionsStr := strings.Join(data.SelectedOptions, " ")

		// 명령어를 동적으로 생성하여 실행
		cmdStr := fmt.Sprintf("source ~/anaconda3/bin/activate minipin && python3 detecting_abnormal_behaviour/main.py --video_path detecting_abnormal_behaviour/video/hand_clapping_video/sound2.mp4 --type %s", selectedOptionsStr)
		fmt.Println("Executing command:", cmdStr)
		cmd := exec.Command("bash", "-c", cmdStr)

		// 명령어 실행 결과와 오류를 캡처
		output, err := cmd.CombinedOutput()
		if err != nil {
			fmt.Println("Error executing command:", err)
			fmt.Println("Command output:", string(output))
			return c.Status(500).SendString("Failed to run Python script: " + string(output))
		}

		fmt.Println("Python script output:", string(output))

		// Python 스크립트가 생성한 JSON 파일을 읽어옴
		file, err := ioutil.ReadFile("detecting_abnormal_behaviour/data/combined_data.json")
		if err != nil {
			fmt.Println("Error reading JSON file:", err)
			return c.Status(500).SendString("Failed to read JSON file")
		}

		// JSON 데이터를 파싱하여 응답으로 반환
		var jsonData map[string]interface{}
		if err := json.Unmarshal(file, &jsonData); err != nil {
			fmt.Println("Error parsing JSON file:", err)
			return c.Status(500).SendString("Failed to parse JSON file")
		}

		return c.JSON(jsonData)
	})

	fmt.Println("Server is running on http://localhost:8000")
	app.Listen(":8000")
}
