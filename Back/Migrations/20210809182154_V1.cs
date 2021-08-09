using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Igraonica",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    M = table.Column<int>(type: "int", nullable: false),
                    N = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Igraonica", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "BoardGame",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    BrojIgraca = table.Column<int>(type: "int", nullable: false),
                    Tip = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PlayingPlaceID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoardGame", x => x.ID);
                    table.ForeignKey(
                        name: "FK_BoardGame_Igraonica_PlayingPlaceID",
                        column: x => x.PlayingPlaceID,
                        principalTable: "Igraonica",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sto",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    I = table.Column<int>(type: "int", nullable: false),
                    J = table.Column<int>(type: "int", nullable: false),
                    IgraID = table.Column<int>(type: "int", nullable: true),
                    BrojIgraca = table.Column<int>(type: "int", nullable: false),
                    MaxBrojIgraca = table.Column<int>(type: "int", nullable: false),
                    Boja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlayingPlaceID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sto", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Sto_BoardGame_IgraID",
                        column: x => x.IgraID,
                        principalTable: "BoardGame",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sto_Igraonica_PlayingPlaceID",
                        column: x => x.PlayingPlaceID,
                        principalTable: "Igraonica",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BoardGame_PlayingPlaceID",
                table: "BoardGame",
                column: "PlayingPlaceID");

            migrationBuilder.CreateIndex(
                name: "IX_Sto_IgraID",
                table: "Sto",
                column: "IgraID");

            migrationBuilder.CreateIndex(
                name: "IX_Sto_PlayingPlaceID",
                table: "Sto",
                column: "PlayingPlaceID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sto");

            migrationBuilder.DropTable(
                name: "BoardGame");

            migrationBuilder.DropTable(
                name: "Igraonica");
        }
    }
}
